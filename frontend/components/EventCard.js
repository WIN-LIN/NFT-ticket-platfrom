import { CardMedia, Card, CardContent, Typography, CardActionArea } from '@mui/material';
export default function EventCard(props) {
    console.log('props',props.props['start_time']);
    // conver timestamp to local datetime
    const startTime = new Date(parseInt(props.props['start_time']) * 1000);
    const endTime = new Date(parseInt(props.props['end_time']) * 1000);
    return (
        <Card sx={{maxWidth: 280, marginBottom:5}}>
            <CardActionArea href={`/event-detail/${props.props['ID']}`}>
                <CardMedia
                    sx={{height: 170, width: 280}}
                    image={`/events/${props.props['cover_img']}`}
                />
                <CardContent>
                    <Typography variant="caption" color="text.secondary">
                        {startTime.getFullYear()}/{startTime.getMonth()+1}/{startTime.getDate()}-{endTime.getFullYear()}/{endTime.getMonth()+1}/{endTime.getDate()}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }} >
                        {props.props['name']}
                    </Typography>
                    <Typography variant="overline" >
                        {props.props['place']}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}