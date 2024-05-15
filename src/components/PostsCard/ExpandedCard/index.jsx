/* eslint-disable react/prop-types */
import React from "react";
import "./styles.css";
import { useState } from "react";
import { Collapse, Button } from "@mui/material";
import useUser from "../../../utils/services/hooks/useUser";
import axios from "axios";
import usePost from "../../../utils/services/hooks/usePost";

export default function ExpandedCard({ post, style, setStyle }) {
  const [expanded, setExpanded] = useState(-1);
  const [viewed, setViewed] = useState(false);

  const handleExpandClick = (id) => {
    setExpanded(expanded === id ? -1 : id);
    setStyle(!style);
    if (!viewed) {
      setViewed(true);
      postViews(post?.id);
    }
  };

  const { user } = useUser();

  async function postViews(idPublication) {
    if (!viewed) {
      try {
        const isLogged = user != null;
        console.log("isLogged", isLogged);
        let idUser;
        if (isLogged) {
          idUser = user.id;
        } else {
          idUser = 0;
        }
        const response = await usePost({
          url: `publication/increaseView/${idUser}/${idPublication}`,
          body: { idUser: idUser, idPublication: idPublication },
        });
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <>
      <section className="posts-cards-inner-wrapper">
        <div className="posts-card-text-container">
          <p
            className="shortText"
            style={{ height: expanded === post?.id ? "auto" : "96px" }}
          >
            {post?.description}
          </p>
          <Collapse
            sx={{ margin: "0px", padding: "0px" }}
            className="postsCards-collapse-div"
            in={expanded === post?.id}
            out={expanded === post?.id}
            timeout={"auto"}
            unmountOnExit
          ></Collapse>
        </div>
        <div className="posts-card-button-container">
          <Button
            className="posts-cards-button"
            sx={{ textTransform: "none" }}
            variant="text"
            expand={expanded ? "true" : undefined}
            onClick={() => handleExpandClick(post?.id)}
            aria-expanded={expanded === post?.id}
            aria-label="show more"
          >
            {expanded === post?.id ? (
              <p className="see-more">Ver menos</p>
            ) : (
              <p onClick={() => postViews(post?.id)} className="see-more">
                Ver mas
              </p>
            )}
          </Button>
        </div>
      </section>
    </>
  );
}
