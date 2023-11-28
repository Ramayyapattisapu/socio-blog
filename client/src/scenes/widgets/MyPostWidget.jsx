import {
  Divider,
  InputBase,
  useTheme,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const { palette } = useTheme();
  const { _id, userName } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("category");
  const [location, setLocation] = useState("");

  const postZeroState = () => {
    setContent("");
    setCategory("");
    setLocation("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userId: _id,
      content: content,
      category: category,
      location: location,
    };

    try {
      const response = await fetch(
        "https://socio-blog.onrender.com/post/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const posts = await response.json();
      dispatch(setPosts({ posts }));
      postZeroState();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage name={userName[0].toUpperCase()} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      <FlexBetween style={{ marginTop: 15 }}>
        <InputBase
          placeholder="Add Location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          sx={{
            width: "50%",
            height: "38px",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
        <Select
          value={category}
          placeholder="Select a Category"
          onChange={(e) => setCategory(e.target.value)}
          sx={{
            backgroundColor: neutralLight,
            width: "150px",
            // height: "60px",
            borderRadius: "0.25rem",
            p: "0.25rem 1rem",
            "& .MuiSvgIcon-root": {
              pr: "0.25rem",
              width: "3rem",
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: neutralLight,
            },
          }}
          input={<InputBase placeholder="Select a Category" />}
        >
          <MenuItem value="Technology">Technology</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Education">Education</MenuItem>
          <MenuItem value="AutoBio">AutoBio</MenuItem>
          <MenuItem value="Reviews">Reviews</MenuItem>
        </Select>
      </FlexBetween>

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <Button
          // disabled={!post}
          onClick={handleSubmit}
          style={{ color: "black" }}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
        <Button
          onClick={postZeroState}
          style={{ color: "black" }}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Cancel
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
