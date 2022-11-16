import * as React from "react";
import { styled, Card, CardHeader, CardActions, CardContent, CardMedia, Collapse, Avatar, Button, Typography } from '@mui/material';
import IconButton, { IconButtonProps } from "@mui/material";
import EditIcon from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material';
import SuperheroImage from "../../assets/superheroes-at-the-movies-min.jpeg";

interface IReviewCardProps {
    user: string;
    title: string;
    summary: string;
}
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ReviewCard(props: IReviewCardProps) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                titleTypographyProps={props.title}
            />
            <CardMedia
                component="img"
                height="194"
                image={SuperheroImage}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.user}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="edit your review">
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete your review">
                    <DeleteIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Title:{props.title}</Typography>
                    <Typography paragraph>
                        {props.summary}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}