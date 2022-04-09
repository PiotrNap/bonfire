/**
 * @name dataContext
 * @desc Context container for the profile data
 */
import React, { useState, createContext } from "react"
import { ProfileState } from "interfaces/profileInterface"

export const initialState: ProfileState = {
  username: "",
  name: "",
  publicKey: "",
  id: "",
  bio: "",
  imageURL: "",
  profession: "",
  jobTitle: "",
  description: "",
  skills: "",
  hasSyncedWallet: false,
  timeBlockLengthMin: 0,
  timeBlockCostADA: 0,
  walletBalance: 0,
  profileType: "",
  setName: () => {},
  setUsername: () => {},
  setProfileType: () => {},
  setId: () => {},
  setPublicKey: () => {},
  setBio: () => {},
  setImageURL: () => {},
  setTimeBlockLengthMin: () => {},
  setTimeBlockCostADA: () => {},
  setHasSyncedWallet: () => {},
  setWalletBalance: () => {},
  setProfession: () => {},
  setJobTitle: () => {},
  setDescription: () => {},
  setSkills: () => {},
  resetProfileState: () => {},
}

export interface ContextProviderProps {
  children: React.ReactNode
}

export const ProfileContext = createContext<ProfileState>(initialState)

export const ProfileContextProvider = ({ children }: ContextProviderProps) => {
  const [username, setUsername] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [id, setId] = useState<string>("")
  const [publicKey, setPublicKey] = useState<string>("")
  const [bio, setBio] = useState<string>("")
  const [imageURL, setImageURL] = useState<string>("")
  const [timeBlockLengthMin, setTimeBlockLengthMin] = useState<number | null>(0)
  const [timeBlockCostADA, setTimeBlockCostADA] = useState<number | undefined>(
    0
  )
  const [profession, setProfession] = useState<string | undefined>("")
  const [jobTitle, setJobTitle] = useState<string | undefined>("")
  const [description, setDescription] = useState<string | undefined>("")
  const [skills, setSkills] = useState<string | undefined>("")
  const [hasSyncedWallet, setHasSyncedWallet] = useState<boolean>(false)
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const [profileType, setProfileType] = useState<"" | "attendee" | "organizer">(
    ""
  )

  const resetProfileState = () => {
    setUsername("")
    setName("")
    setId("")
    setPublicKey("")
    setBio("")
    setImageURL("")
    setTimeBlockLengthMin(0)
    setTimeBlockCostADA(0)
    setProfession("")
    setJobTitle("")
    setDescription("")
    setSkills("")
    setHasSyncedWallet(false)
    setWalletBalance(0)
    setProfileType("")
  }

  return (
    <ProfileContext.Provider
      value={{
        username,
        name,
        id,
        publicKey,
        walletBalance,
        bio,
        imageURL,
        hasSyncedWallet,
        timeBlockLengthMin,
        timeBlockCostADA,
        profession,
        jobTitle,
        description,
        skills,
        profileType,
        setProfileType,
        setUsername,
        setName,
        setId,
        setPublicKey,
        setBio,
        setImageURL,
        setWalletBalance,
        setHasSyncedWallet,
        setTimeBlockLengthMin,
        setTimeBlockCostADA,
        setProfession,
        setJobTitle,
        setDescription,
        setSkills,
        resetProfileState,
      }}>
      {children}
    </ProfileContext.Provider>
  )
}
