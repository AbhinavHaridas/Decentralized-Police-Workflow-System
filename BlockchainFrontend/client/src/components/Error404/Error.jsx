import { Container, Title, Text } from "@mantine/core";
import classes from "./Error.module.css";

function Error404() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            Connect your metamask account to access further.
          </Text>
        </div>
      </div>
    </Container>
  );
}

export default Error404;