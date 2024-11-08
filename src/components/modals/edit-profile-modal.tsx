'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { UserInputArgs, UserProfile } from '@/declarations/index_canister/index_canister.did'
import { ProfileSchema } from '@/lib/schemas'
import useActor from '@/store/use-actor'
import useUser from '@/store/use-user'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/common/loader'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { createAccount, updateProfile } from '@/actions/account'

type Props = {
  open: boolean
  type?: 'create' | 'update'
  setOpen: React.Dispatch<boolean>
}

const EditProfileModal = ({ open, setOpen, type = 'update' }: Props) => {
  const { currentUser, setCurrentUser } = useUser()
  const { indexCanister } = useActor()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: currentUser?.username || '',
      // @ts-ignore
      bio: currentUser?.bio || '',
      // @ts-ignore
      avatar: currentUser?.avatar[0] || '',
      // @ts-ignore
      coverImage: currentUser?.cover_image[0] || ''
    }
  })

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    const { username, bio, avatar, coverImage } = values

    // if (
    //   username === currentUser?.username
    //     && bio === currentUser?.bio
    //     && avatar == currentUser?.avatar
    //     && coverImage === currentUser?.cover_image
    // ) return

    const params: UserInputArgs = {
      username,
      bio: !bio ? [] : [bio],
      avatar: !avatar ? [] : [avatar],
      cover_image: !coverImage ? [] : [coverImage]
    }

    setIsLoading(true)

    if (type === 'create') {
      const res = await createAccount(indexCanister!, username, bio, avatar, coverImage)
      if (res.success) {
        // @ts-ignore
        const newUser: UserProfile = {
          ...currentUser,
          username,
          bio: params.bio,
          avatar: params.avatar,
          cover_image: params.cover_image
        }
        toast.success('Account created')
        setCurrentUser(newUser)
        setOpen(false)
      } else {
        console.log('ERR_CREATE_ACCOUNT', res.error)
        toast.error('Something went wrong')
      }
    } else {
      const res = await updateProfile(indexCanister!, username, bio, avatar, coverImage)
      if (res.success) {
        // @ts-ignore
        const newUser: UserProfile = {
          ...currentUser,
          username,
          bio: params.bio,
          avatar: params.avatar,
          cover_image: params.cover_image
        }
        toast.success('Profile updated')
        setCurrentUser(newUser)
        setOpen(false)
      } else {
        console.log('ERR_UPDATE_PROFILE', res.error)
        toast.error('Something went wrong')
      }
    }

    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit your profile</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <div className="space-y-4">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">User Name</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="John Snow"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="bio"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Bio</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Hello"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="avatar"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Avatar</FormLabel>

                    <FormControl>
                      {/* <MediaUploader onUploadSuccess={result => field.onChange(result.info.secure_url)}>
                        <div className="flex justify-center items-center w-full p-4 rounded-md border-2 border-dotted cursor-pointer">
                          {!field.value && <p>Upload avatar</p>}

                          {!!field.value && (
                            <CldImage
                              src={field.value}
                              alt="Avatar"
                              width={100}
                              height={100}
                              className="rounded-md"
                            />
                          )}
                        </div>
                      </MediaUploader> */}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="coverImage"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Cover Image</FormLabel>

                    <FormControl>
                      {/* <MediaUploader onUploadSuccess={result => field.onChange(result.info.secure_url)}>
                        <div className="flex justify-center items-center w-full p-4 rounded-md border-2 border-dotted cursor-pointer">
                          {!field.value && <p>Upload cover image</p>}

                          {!!field.value && (
                            <CldImage
                              src={field.value}
                              alt="Cover image"
                              width={200}
                              height={200}
                              className="rounded-md"
                            />
                          )}
                        </div>
                      </MediaUploader> */}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              {type === 'update' && (
                <DialogClose asChild>
                  <Button variant="outline" disabled={isLoading}>
                    Cancel
                  </Button>
                </DialogClose>
              )}

              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader /> : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal
