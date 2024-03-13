import { Link } from 'react-router-dom';

const GetAuthLinks = ({ link, text }) => {
    return (
        <div className="form-container py-5 border">
            <p className="text-sm">{link.text}<Link to={link.link}>
                <span className="text-blue-600 font-bold ml-1">{text}</span>
            </Link>
            </p>
        </div>
    )
}

export default GetAuthLinks;