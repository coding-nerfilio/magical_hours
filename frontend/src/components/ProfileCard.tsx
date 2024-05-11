import { useEffect } from "preact/hooks";
import { useApi } from "../hooks/useApi";
import Profile from "./Profile";

interface ProfileCardProps {
  username: string;
}

const ProfileCard = (props: ProfileCardProps) => {
  //api
  const api = useApi.Social.getMinimalProfile();

  useEffect(() => {
    api.execute(undefined, { username: props.username });
  }, [props.username]);

  return (
    <Profile.Minimal profile={api.response?.data!} isLoading={api.isLoading} />
  );
};

export default ProfileCard;
