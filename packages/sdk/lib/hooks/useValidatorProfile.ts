import { getProfile, type ValidatorProfile } from "@lib/core/ens";
import { useEffect, useState } from "react";
import type { Address } from "viem";

interface ProfileHookResult {
  profile: ValidatorProfile | null;
  loading: boolean;
  error: string | null;
}

export const useValidatorProfile = (address: Address): ProfileHookResult => {
  const [profile, setProfile] = useState<ValidatorProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const profileAddress = address.toLowerCase() as Address;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getProfile(profileAddress);
        setProfile(userProfile);
      } catch (error) {
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [profileAddress]);

  return { profile, loading, error };
};
