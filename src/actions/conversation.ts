import { Message, MessageStatus, User } from '@prisma/client'

import { db } from '@/lib/db'

export const fetchConversations = async (userId: string) => {
  if (!userId) return { success: false, error: 'Unauthorized' }

  try {
    const conversations = await db.conversation.findMany({
      where: {
        users: {
          some: {
            user_id: userId
          }
        },
        show: true
      },
      orderBy: {
        lastMessageAt: 'desc'
      }
    })

    return { success: true, data: conversations }
  } catch (error) {
    return { success: false, error }
  }
}

export const fetchConversationMessages = async (userId: string, conversationId: string) => {
  if (!userId) return { success: false, error: 'Unauthorized' }
  if (!conversationId) return { success: false, error: 'Missing conversationId' }

  try {
    const messages = await db.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' }
    })

    return { success: true, data: messages }
  } catch (error) {
    return { success: false, error }
  }
}

export const createConversation = async (from: User, to: User) => {
  if (!from || !to) return { success: false , error: 'Missing user info'}

  try {
    const conversation = await db.conversation.create({
      data: { users: [from, to] }
    })
  
    return { success: true, data: conversation.id }
  } catch (error) {
    return { success: false, error }
  }
}

export const sendMessage = async (params: Partial<Message>) => {
  try {
    const { from, to, content, image, video, conversationId } = params

    const newMessage = await db.message.create({
      data: {
        from: from!,
        to: to!,
        content,
        image,
        video,
        status: MessageStatus.SEND,
        conversation: {
          connect: {
            id: conversationId
          }
        }
      }
    })

    await db.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: newMessage.createdAt,
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
    })

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export const fetchLatestMessage = async (conversationId: string) => {
  if (!conversationId) return { success: false, error: 'Missing conversationId' }

  try {
    const messages = await db.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'desc' }
    })

    return { success: true, data: messages[0] }
  } catch (error) {
    return { success: false, error }
  }
}

export const markMessageAsRead = async (messageId: string) => {
  if (!messageId) return { success: false, error: 'Missing messageId' }

  try {
    await db.message.update({
      where: { id: messageId },
      data: { status: MessageStatus.READ }
    })

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export const markConversationMessagesAsRead = async (conversationId: string) => {
  if (!conversationId) return { success: false, error: 'MIssing conversationId' }

  try {
    await db.message.updateMany({
      where: {
        conversationId,
        NOT: { status: MessageStatus.READ }
      },
      data: {
        status: MessageStatus.READ
      }
    })

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export const fetchUnreadMessageCount = async (
  conversationId: string,
  currentUser: User
) => {
  if (!currentUser) return { success: false, error: 'Missing currentUser' }
  if (!conversationId) return { success: false, error: 'Missing conversationId' }

  try {
    const messages = await db.message.findMany({
      where: {
        conversationId,
        to: currentUser,
        NOT: {
          status: MessageStatus.READ
        }
      }
    })

    return { success: true, data: messages.length }
  } catch (error) {
    return { success: false, error }
  }
}

export const hideConversation = async (conversationId: string) => {
  if (!conversationId) return { success: false, error: 'Missing conversationId' }

  try {
    const conversation = await db.conversation.findUnique({
      where: { id: conversationId }
    })

    if (!conversation) return { success: false, error: 'Invalid conversationId' }

    await db.conversation.update({
      where: { id: conversation.id },
      data: { show: false }
    })

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export const showConversation = async (conversationId: string) => {
  if (!conversationId) return { success: false, error: 'Missing conversationId' }

  try {
    const conversation = await db.conversation.findUnique({
      where: { id: conversationId }
    })

    if (!conversation) return { success: false, error: 'Invalid conversationId' }

    await db.conversation.update({
      where: { id: conversation.id },
      data: { show: true }
    })

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export const fetchExistedConversation = async (currentUser: User, selectedUser: User) => {
  if (!currentUser || !selectedUser) {
    return { success: false, error: 'Missing user info' }
  }

  try {
    const conversation = await db.conversation.findFirst({
      where: {
        OR: [
          {
            users: [currentUser, selectedUser]
          },
          {
            users: [selectedUser, currentUser]
          }
        ]
      }
    })

    return { success: true, data: conversation?.id }
  } catch (error) {
    return { success: false, error }
  }
}
