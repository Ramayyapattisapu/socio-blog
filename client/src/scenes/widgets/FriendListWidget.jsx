import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const getFriends = async () => {
    const response = await fetch(
      `https://socio-blog.onrender.com/user/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper style={{ paddingRight: 0, marginTop: 16 }}>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap="1.5rem"
        sx={{
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.userName}`}
            subtitle={friend.occupation}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
