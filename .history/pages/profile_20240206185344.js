import React from 'react';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [reactions, setReactions] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id, user.uid)
      .then((data) => setPostDetails(data))
      .catch((error) => console.error(error));

    getPostReactions(id)
      .then((reaction) => setReactions(reaction))
      .catch((error) => console.error(error));
  }, [id, user.uid]);

  return (
    <div />
  );
}
