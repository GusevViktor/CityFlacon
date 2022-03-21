
import './Article.scss'
import { RiArrowDownSLine } from "react-icons/ri"
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
import { BsBookmark } from "react-icons/bs"
import { useState } from 'react'

const Article = ({ title, description, type, domainName, domainLogo, score, image }) => {
    const onClickArticle = e => {
        onClick && onClick(e)
    }
    const [isOpen, setIsOpen] = useState(false)
    const onChangeOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="article-wrap">
            <div className={`article-main ${!isOpen ? 'article-main_no-border-bt' : ''}`}>
                <div className='article-img'>
                    <img
                        width='130px'
                        height='90px'
                        src={image}
                        alt={`image: ${title}`} align='left'
                    />
                </div>
                <div className="article-inner">
                    <div className='article-title-and-score'>
                        <div className='article-title'>
                            {title}
                        </div>
                        <div className="article-score-and-arrow">
                            <div className="article-score">
                                {`${score}%`}
                            </div>
                            <div className={`article-score-arrow ${isOpen ? 'article-score-translate' : ''}`} onClick={onChangeOpen}>
                                <RiArrowDownSLine color="#8c8c8c" size={22} />
                            </div>
                        </div>

                    </div>
                    {isOpen && (
                        <div className='article-description'>
                            {description}
                        </div>
                    )}
                    <div className="article-domain">
                        <img width='18px' height='18px' src={domainLogo} alt={`domain logo: ${domainName}`} />
                        <div className='article-domain-name'>{domainName}</div>
                        <div className='article-domain-time'>{domainName}</div>
                    </div>
                    <div className="article-procent-and-arrow">
                        <div>
                            {`${score}%`}
                        </div>
                        <div className={`article-score-arrow ${isOpen ? 'article-score-translate' : ''}`} onClick={onChangeOpen}>
                            <RiArrowDownSLine color="#8c8c8c" size={22} />
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="article-footer">
                        <div className="article-footer-text-and-icon">
                            <AiOutlineLike />
                            <div className="article-footer-text">
                                Like
                            </div>
                        </div>
                        <div className="article-footer-text-and-icon">
                            <AiOutlineDislike />
                            <div className="article-footer-text">
                                Dislike
                            </div>
                        </div>
                        <div className="article-footer-text-and-icon">
                            <BsBookmark />
                            <div className="article-footer-text">
                                Bookmark
                            </div>
                        </div>
                </div>
            )}
        </div>
    );
  }
  
  export default Article;