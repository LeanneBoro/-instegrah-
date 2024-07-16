export function ProfileImg({ imgUrl, diameter }) {

    const style = {
        height: diameter,
        width: diameter,
        borderRadius: '50%', 
        objectFit: 'cover',
        marginRight: '15px',
    }

    return <img src={imgUrl} alt="Profile" style={style} />
}