import { router } from "expo-router";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    console.log("Not found");
    router.back();
  }, []);

  return null;
}
