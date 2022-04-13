import { setAuthorizationToken } from "Api/base"
import { getFromEncryptedStorage } from "lib/encryptedStorage"
import { startChallengeSequence } from "lib/helpers"
import * as React from "react"

export const useAppLogin = () => {
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false)
  const [isAuthLoaded, setIsAuthLoaded] = React.useState<boolean>(false)
  const [user, setUser] = React.useState<any>(null)
  const isExpired = (expiration: Date) => expiration > new Date()

  React.useEffect(() => {
    ;(async () => {
      try {
        // let at = await getFromEncryptedStorage("auth-credentials")
        let sec = await getFromEncryptedStorage("privKey")
        let pub = await getFromEncryptedStorage("pubKey")

        /**
         * We want to make sure if user exists in database first,
         * TODO set the TTL for JWT and test it
         */
        // if (at && !isExpired(at.expiresAt)) {
        //   setAuthorizationToken(at.accessToken);
        //   setIsAuthorized(true);
        //   setUser({
        //     username: at.username,
        //     profileType: at.profileType,
        //     id: at.id,
        //   });
        // }

        if (sec && pub) {
          const accessTokenDto = await startChallengeSequence(pub, false)
          console.log("access token? ", accessTokenDto)

          if (accessTokenDto) {
            setUser({
              username: accessTokenDto.username,
              profileType: accessTokenDto.profileType,
              id: accessTokenDto.id,
            })
            setAuthorizationToken(accessTokenDto.accessToken)
            setIsAuthorized(true)
          }
        } else {
          if (isAuthorized) setIsAuthorized(false)
        }

        setIsAuthLoaded(true)
      } catch (e) {
        setIsAuthLoaded(true)
      }
    })()
  }, [])

  return { isAuthorized, isAuthLoaded, user }
}
