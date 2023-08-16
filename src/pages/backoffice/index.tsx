import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const BackOfficeApp = () => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/backoffice/orders");
    }
    if (status !== "loading" && status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [data, router]);

  return null;
};

export default BackOfficeApp;
