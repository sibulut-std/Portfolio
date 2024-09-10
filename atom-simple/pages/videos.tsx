'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { getCurrentUser } from '../utils/auth'
import { getUserMetadata, updateUserMetadata } from '../utils/dynamodb'

// Define the video object structure
const videos = [
  { id: 1, title: 'Video 1', url: 'https://www.youtube.com/watch?v=vhb7B3i4r0k' },
  { id: 2, title: 'Video 2', url: 'https://www.youtube.com/watch?v=vhb7B3i4r0k' },
  { id: 3, title: 'Video 3', url: 'https://www.youtube.com/watch?v=vhb7B3i4r0k' },
]

// Define types for user and metadata
type User = {
  username: string;
  [key: string]: any;
}

type Metadata = {
  videosWatched: number[];
  totalVideosWatched: number;
  videoRatings: Record<number, number>;
}

export default function Videos() {
  const [user, setUser] = useState<User | null>(null)
  const [metadata, setMetadata] = useState<Metadata | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
        const userMetadata = await getUserMetadata(currentUser.username)
        setMetadata(userMetadata as Metadata)
      } catch (error) {
        router.push('/auth')
      }
    }
    checkAuth()
  }, [router])

  const handleWatchVideo = async (videoId: number) => {
    if (!user || !metadata) return;
    const updatedMetadata: Metadata = {
      ...metadata,
      videosWatched: [...metadata.videosWatched, videoId],
      totalVideosWatched: metadata.totalVideosWatched + 1,
    }
    await updateUserMetadata(user.username, updatedMetadata)
    setMetadata(updatedMetadata)
  }

  const handleRateVideo = async (videoId: number, rating: number) => {
    if (!user || !metadata) return;
    const updatedMetadata: Metadata = {
      ...metadata,
      videoRatings: { ...metadata.videoRatings, [videoId]: rating },
    }
    await updateUserMetadata(user.username, updatedMetadata)
    setMetadata(updatedMetadata)
  }

  if (!user || !metadata) {
    return <Layout>Loading...</Layout>
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Videos</h1>
        <p className="mb-4">Total videos watched: {metadata.totalVideosWatched}</p>
        <div className="space-y-4">
          {videos.map((video) => (
            <div key={video.id} className="border p-4 rounded shadow-md">
              <h2 className="text-xl font-bold mb-2">{video.title}</h2>
              <button
                onClick={() => handleWatchVideo(video.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
              >
                Watch Video
              </button>
              <div className="mt-4">
                <p className="mb-2">Rate this video:</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRateVideo(video.id, rating)}
                      className={`px-3 py-1 rounded ${
                        metadata.videoRatings[video.id] === rating
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      } transition duration-300 ease-in-out`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}