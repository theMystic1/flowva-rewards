import { useEffect, useRef, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getSession, getUserById } from "lib/auth";
import type { UseUserState } from "types/type";
import { useQuery } from "@tanstack/react-query";
import { qk } from "lib/queryKeys";

export const useUser = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [qk.me],
    queryFn: () => getUserById(),
  });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
