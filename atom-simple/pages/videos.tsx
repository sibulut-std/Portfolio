'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { getCurrentUser } from '../utils/auth'
import { getUserMetadata, updateUserMetadata } from '../utils/dynamodb'

const videos = [
  { id: 1, title: 'Video 1', url: 'https://example.com/video1' },
  { id: 2, title: 'Video 2', url: 'https://example.com/video2' },
  { id: 3, title: 'Video 3', url: 'https://example.com/video3' },
]

export default function Videos() {
  const [user, setUser] = useState(null)
  const [metadata, setMetadata] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
        const userMetadata = await getUserMetadata(currentUser.username)
        setMetadata(userMetadata)
      } catch (error) {
        router.push('/auth')
      }
    }
    checkAuth()
  }, [router])

  const handleWatchVideo = async (videoId) => {
    const updatedMetadata = {
      ...metadata,
      videosWatched: [...(metadata.videosWatched || []), videoId],
      totalVideosWatched: (metadata.totalVideosWatched || 0) + 1,
    }
    await updateUserMetadata(user.username, updatedMetadata)
    setMetadata(updatedMetadata)
  }

  const handleRateVideo = async (videoId, rating) => {
    const updatedMetadata = {
      ...metadata,
      videoRatings: { ...(metadata.videoRatings || {}), [videoId]: rating },
    }
    await updateUserMetadata(user.username, updatedMetadata)
    setMetadata(updatedMetadata)
  }

  if (!user || !metadata) {
    return <Layout>Loading...</Layout>
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Videos</h1>
      <p className="mb-4">Total videos watched: {metadata.totalVideosWatched || 0}</p>
      <div className="space-y-4">
        {videos.map((video) => (
          <div key={video.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{video.title}</h2>
            <button
              onClick={() => handleWatchVideo(video.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Watch Video
            </button>
            <div className="mt-2">
              Rate this video:
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRateVideo(video.id, rating)}
                  className={`ml-2 px-2 py-1 rounded ${
                    metadata.videoRatings?.[video.id] === rating
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}