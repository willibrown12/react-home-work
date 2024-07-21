import { MovieType } from '../service';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AirplayIcon from '@mui/icons-material/Airplay';
import { useNavigate } from 'react-router-dom';

export default function MovieCard(props: MovieType & { doSomething: (p: MovieType) => void }) {
    const navigate = useNavigate()
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {props?.Title[0]?.toUpperCase() + props?.Year}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.Title}
                subheader={props.Year}
            />
            <CardMedia
                component="img"
                height="194"
                image={props.Poster}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.Type}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon onClick={() => {
                        const { doSomething, ...restOfProps } = props
                        props.doSomething(restOfProps)
                    }} />
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <AirplayIcon onClick={() => {
                        navigate(`/movie/${props.imdbID}`)
                    }} />
                </IconButton>
            </CardActions>
        </Card>
    );
}

