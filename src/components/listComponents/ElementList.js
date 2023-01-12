import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemIcon from "@mui/material/ListItemIcon";
import img from "../../no-task.png";

export default function ElementList({ items, handleDelete, handleToggle }) {
  return (
    <React.Fragment>
      {items.length > 0 && (
        <Paper
          style={{
            padding: 8,
            margin: "auto",
            textAlign: "center",
            width: "90%",
            marginTop: "1.2em",
          }}
        >
          <List sx={{ bgcolor: "background.paper" }}>
            <Grid container>
              {items.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="clear"
                        onClick={() => handleDelete(item.id)}
                      >
                        <ClearIcon />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={() => handleToggle(item)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={item.estado === 1}
                          // tabIndex={false}
                          sx={{
                            color: "#064851",
                            "&.Mui-checked": {
                              color: "#064851",
                            },
                          }}
                          disableRipple
                          inputProps={{ "aria-labelledby": item.estado }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={item.id}
                        primary={item.valor}
                        style={
                          item.estado === 1
                            ? { textDecoration: "line-through" }
                            : { textDecoration: "none" }
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </Grid>
          </List>
        </Paper>
      )}
      {items.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            flexWrap: "nowrap",
            alignItems: "center",
            position: "relative",
            top: "50%",
          }}
        >
          <img alt="Sin elementos" src={img} style={{ maxWidth: "8em" }} />
          <Typography
            variant="h6"
            gutterBottom
            style={{
              textTransform: "none",
              padding: "6px 12px",
              lineHeight: 1.5,
              fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
              ].join(","),
            }}
          >
            Agregá elementos a la lista
          </Typography>
        </div>
      )}
    </React.Fragment>
  );
}
