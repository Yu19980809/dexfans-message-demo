import { index_canister } from '@/declarations/index_canister'
import { Membership } from '@/declarations/index_canister/index_canister.did'

type IndexCanister = typeof index_canister

export const purchaseMember = async (actor: IndexCanister, membership: Membership) => {
  if (!actor) return { success: false, error: 'Missing icp_ledger_canister' }
  if (!membership) return { success: false, error: 'Missing membership' }

  try {
    const res = await actor.api_purchase_membership(membership)

    if ('Ok' in res) {
      return { success: true }
    } else {
      return { success: false, error: res.Err }
    }
  } catch (error) {
    return { success: false, error }
  }
}
