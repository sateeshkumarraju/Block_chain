"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@/lib/useWallet"
import type { UserProfile as UserProfileType } from "@/lib/mock-contracts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UserProfile() {
  const { isConnected, walletManager } = useWallet()
  const [profile, setProfile] = useState<UserProfileType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError(null)
        const userProfile = await walletManager.getUserProfile()
        setProfile(userProfile)
        console.log("[v0] User profile loaded:", userProfile)
      } catch (err: any) {
        setError(err.message)
        console.error("[v0] Error loading profile:", err)
      } finally {
        setLoading(false)
      }
    }

    if (isConnected) {
      fetchProfile()
    }
  }, [isConnected, walletManager])
  
  // Auto-refresh every second to show fee updates in real-time
  useEffect(() => {
    if (!isConnected) return
    const interval = setInterval(async () => {
      try {
        const userProfile = await walletManager.getUserProfile()
        setProfile(userProfile)
      } catch (err) {
        // Silent fail on refresh
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [isConnected, walletManager])

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-gray-600">Connect your wallet to view profile</CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">Loading profile...</CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-red-600">Error: {error}</CardContent>
      </Card>
    )
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-gray-600">No profile data</CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">📚 Borrowed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{profile.borrowedBooks.length}</p>
          <p className="text-xs text-gray-600">active books</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">👤 Total Borrowed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{profile.totalBorrowed}</p>
          <p className="text-xs text-gray-600">lifetime</p>
        </CardContent>
      </Card>

      <Card className={profile.totalFeesPaid > 0 ? "border-red-200 bg-red-50" : ""}>
        <CardHeader>
          <CardTitle className={`text-sm flex items-center gap-2 ${profile.totalFeesPaid > 0 ? "text-red-700" : ""}`}>
            💵 Fees Paid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-2xl font-bold ${profile.totalFeesPaid > 0 ? "text-red-600" : "text-green-600"}`}>
            {profile.totalFeesPaid.toFixed(4)}
          </p>
          <p className="text-xs text-gray-600">ETH</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">🎁 Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{profile.rewardsEarned}</p>
          <p className="text-xs text-gray-600">tokens</p>
        </CardContent>
      </Card>
    </div>
  )
}
