import React, { useContext } from "react";
import { InMemoryCache, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "../App.css";
import {
  Button,
  Card,
  Grid,
  GridColumn,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  const likePost = () => {
    console.log("Like post");
  };
  const commentOnPost = () => {
    console.log("comment post");
  };

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>recent posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <GridColumn>
            <PostForm />
          </GridColumn>
        )}
        {loading ? (
          <h1>loading posts . . .</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <GridColumn key={post.id} style={{ marginBottom: 20 }}>
              <Card fluid>
                <Card.Content>
                  <Image
                    floated="right"
                    size="mini"
                    src="https://semantic-ui.com/images/avatar2/large/molly.png"
                  />
                  <Card.Header>{post.username}</Card.Header>
                  <Card.Meta as={Link} to={`/posts/${post.id}`}>
                    {moment(post.createdAt).from()}
                  </Card.Meta>
                  <Card.Description>{post.body}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button as="div" labelPosition="right" onClick={likePost}>
                    <Button color="teal" basic>
                      <Icon name="heart" />
                      Like
                    </Button>
                    <Label basic color="teal" pointing="left">
                      {post.likeCount}
                    </Label>
                  </Button>
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={commentOnPost}
                  >
                    <Button color="blue" basic>
                      <Icon name="comments" />
                      Like
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {post.commentCount}
                    </Label>
                  </Button>
                </Card.Content>
              </Card>
            </GridColumn>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
