import React, { Fragment } from 'react';
import {
  Chip,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Divider,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import StarBorder from '@material-ui/icons/StarBorder';
import GitHubIcon from '@material-ui/icons/GitHub';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import { Repository } from '../types';
import { useGitHub } from '../context/GitHubContext';
import LoadMore from './LoadMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'start',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    loadMore: {
      width: '100%',
      textAlign: 'center',
      marginTop: theme.spacing(1),
    },
  })
);

const RepositoriesList: React.FC<{}> = () => {
  const [{ repositories, totalRepositoriesCount }] = useGitHub();
  const classes = useStyles();

  const repositoryRendere = (repo: Repository) => (
    <Fragment key={repo.cursor}>
      <ListItem>
        <ListItemAvatar>
          <Avatar variant="rounded">
            <GitHubIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={repo.node.name}
          secondary={
            <>
              <div className={classes.root}>
                <Chip
                  size="small"
                  icon={<StarBorder fontSize="small" color="primary" />}
                  label={repo.node.stargazerCount}
                  variant="outlined"
                />
                <Chip
                  size="small"
                  icon={<DeviceHubIcon fontSize="small" color="primary" />}
                  label={repo.node.forkCount}
                  variant="outlined"
                />
              </div>
            </>
          }
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <StarBorder />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  );

  return (
    <List
      subheader={
        <ListSubheader>
          Repositories ({repositories.length} of {totalRepositoriesCount})
        </ListSubheader>
      }>
      {repositories.map(repositoryRendere)}
      {totalRepositoriesCount > repositories.length ? (
        <ListItem>
          <div className={classes.loadMore}>
            <ListSubheader>
              Repositories ({repositories.length} of {totalRepositoriesCount})
            </ListSubheader>
            <LoadMore />
          </div>
        </ListItem>
      ) : null}
    </List>
  );
};

export default RepositoriesList;
