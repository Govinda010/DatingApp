import { Photo } from "./photo"

export interface Member {
    id: number
    userName: string
    photoUrl: string
    age: number
    created: string
    knownAs: string
    lastActive: string
    gender: string
    introdcution: any
    lookingFor: string
    interests: string
    city: string
    country: string
    photos: Photo[]
  }
  
