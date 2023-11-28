import { Box } from "@mui/material";
const UserImage = ({ size = "60px", name }) => {
  return (
    <Box width={size} height={size}>
      <div
        className="avatar"
        style={{
          backgroundColor: "#d576e8",
          objectFit: "cover",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50px",
          width: "50px",
        }}
      >
        {name}
      </div>
    </Box>
  );
};

export default UserImage;
