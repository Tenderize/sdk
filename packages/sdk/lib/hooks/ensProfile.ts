import { getProfile, type ValidatorProfile } from "@lib/services/ens";
import { useEffect, useState } from "react";
import type { Address } from "viem";

interface ProfileHookResult {
  profile: ValidatorProfile | null;
  loading: boolean;
  error: string | null;
}

export const useEnsProfile = (address: Address): ProfileHookResult => {
  const [profile, setProfile] = useState<ValidatorProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getProfile(address);
        setProfile(userProfile);
      } catch (error) {
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [address]);

  return { profile, loading, error };
};
