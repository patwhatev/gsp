import Link from "next/link";

export default function PostCard(props) {
    const { post } = props
    return (
        <Link className="unstyled" href={`/post/${post.slug}`}>
            <div className="postCard">
                <p>penis</p>
                <h3>{post.title}</h3>
                <img src ={post.img_path} />
                <div className="after">
                    <p className="bio">{post.bio}</p>
                    <div className="statsContainer">
                        <div>
                            <h5>Date</h5>
                            <p>{post.date} </p>
                        </div>
                        <div>
                            {/* <h5>Cook Time</h5> */}
                        </div>
                    </div>
                </div>    
            </div>
        </Link>
    )
}