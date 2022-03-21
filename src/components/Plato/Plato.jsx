
import './Plato.scss'
import { useMediaQuery } from 'beautiful-react-hooks';

import { FaFilter, FaRedo } from 'react-icons/fa';
import { GoTriangleUp } from 'react-icons/go';
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "../Select/Select";
import { useState, useEffect } from 'react';
import axios from '../../../node_modules/axios/index';
import Article from '../Article/Article';

const autorefreshOptions = [
    { value: 10, label: '10 seconds', text: '10s' },
    { value: 30, label: '30 seconds', text: '30s' },
    { value: 60, label: '1 minute', text: '1m' },
    { value: 600, label: '10 minutes', text: '10m' },
  ];


  const ordersOptions = [
    { value: "top", label: "top", text: "top"},
    { value: "latest", label: "latest", text: "latest"},
    { value: "retweeted", label: "retweeted", text: "retweeted"},
    { value: "read", label: "read", text: "read"}
  ];

  const languagesOptions = [
    { value: "en", text: "en", label: "English" },
    { value: "de", text: "de", label: "German"},
    { value: "zh", text: "zh", label: "Chinese"},
    { value: "it", text: "it", label: "Italian"},
  ];
const Plato = () => {
    const isSmall = useMediaQuery('(max-width: 320px)'); 
    const [nextPageToken, setNextPageToken] = useState('')
    const [stories, setStories] = useState([])
    const [filtersVisible, setFiltersVisible] = useState(false)
    const [autorefresh, setAutorefresh] = useState({value: '', label: '', text: ''})
    const [languages, setLanguages] = useState([])
    const [orders, setOrders] = useState([])

    const getFilters = (languages, orders, withoutQuestion) => {
        const textLanguages =  languages.map(({ value}) => value).join(',')
        const textOrders =  orders.map(({ value}) => value).join(',')
        const isNotEmpty = textLanguages || textOrders
        const newArr = [textLanguages ? `languages=${textLanguages}` : '', textOrders ? `order=${textOrders}` : ''].filter(item => item)
        const mark = withoutQuestion ? ';' : '?'
        return `${isNotEmpty ? mark : ''}${newArr.join('&')}`
    }

    const getStories = async (languages, orders) => {
        await axios(`https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories${getFilters(languages, orders)}`).then((result) => {
            setNextPageToken(result?.data?.next_page_token || '')
            setStories(result?.data?.stories || [])
        })
    }

    useEffect(() => {
        getStories(languages, orders)
    }, [])

    const loadMoreItems = () => {
        axios(`https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories?page_token=${nextPageToken}${getFilters(languages, orders, true)}`).then((result) => {
            setNextPageToken(result?.data?.next_page_token || '')
            setStories(stories.concat(result?.data?.stories || []))
        })
    }


    
    const onChangeAutorefresh = (options) => {
        setAutorefresh(options)
        const timeValue = setInterval(() => {
            getStories(languages, orders)
            if(!autorefresh.value) {
                clearTimeout(timeValue)
            }
        }, options.value * 1000)
    }

    const onChangeLanguages = (options) => {
        setLanguages(options)
        getStories(options, orders)
    }

    const onChangeOrders = (options) => {
        setOrders(options)
        getStories(languages, options)
    }

    const onClickButtonReset = () => {
        setAutorefresh({value: '', text: '', label: ''})
        setOrders([])
        setLanguages([])
        getStories([], [])
    }

    const onClickShowFilters = () => {
        setFiltersVisible(!filtersVisible)
        onClickButtonReset()
    }

    return (
        <div className={'plato-wrap'}>
            <div className='plato-left'>
                <div className="plato-title-and-buttons">
                    <div className='plato-title'>
                        Watchlist Name
                    </div>
                    <div className="plato-buttons">
                        <button className="plato-button-refresh">
                            <FaRedo color="#3971c1" />
                            <div className="plato-button-name plato-button-name_refresh">
                                Refresh
                            </div>
                        </button>
                        <button className="plato-button-filters" onClick={onClickShowFilters}>
                            <FaFilter color="#3971c1" />
                            <div className="plato-button-name plato-button-name_filters">
                                Filters
                            </div> 
                        </button>
                    </div>
                </div>
                {filtersVisible && (
                    <div className='plato-filters'>
                        <div className="plato-filters-triangle">
                            <GoTriangleUp size={24} color={`${isSmall ? "#fff" : '#eee'}`} width={100} />
                        </div>
                    
                        <div>
                            <Select isMulti={false} options={autorefreshOptions} subTitle='AUTOREFRESH' onChange={onChangeAutorefresh} optionSelected={autorefresh} />
                        </div>
                        <div className='plato-select plato-select-border'>
                            <Select options={ordersOptions} subTitle='ORDERS' onChange={onChangeOrders} optionSelected={orders} />
                        </div>
                        <div className='plato-select'>
                            <Select options={languagesOptions} subTitle='LANGUAGES' onChange={onChangeLanguages} optionSelected={languages} />
                        </div>
                        {!isSmall && (
                            <button className="plato-button" onClick={onClickButtonReset}>
                                reset
                            </button>
                        )}
                    </div>
                )}  
                    <div className="plato-list">
                        <InfiniteScroll
                            dataLength={stories.length} //This is important field to render the next data
                            next={loadMoreItems}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                            height={filtersVisible ? 'calc(100vh - 320px)' : 'calc(100vh - 200px)'}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                            >
                            {stories.map(({ id, title, description, type, domain_name, domain_cached_logo_url, score, imageUrls }, index) => (
                                <div className="plato-article" key={id}>
                                    <Article
                                        title={title}
                                        description={description}
                                        type={type}
                                        domainName={domain_name}
                                        domainLogo={domain_cached_logo_url}
                                        score={score}
                                        image={imageUrls?.[0] || null}
                                    />
                                </div>
                            ))}
                        </InfiniteScroll>
                    </div>
            </div>
            <div className='plato-right'>
                
            </div>
        </div>
    );
  }
  
  export default Plato;