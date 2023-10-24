"use client"

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard 
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

export const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const [originalPosts, setOriginalPosts] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchText(text);

        if (text.startsWith("#")) {
            // Поиск по тегу
            const tag = text.slice(1); // Убираем символ '#'
            setSelectedTag(tag);

            const filteredPosts = originalPosts.filter((post) => {
                return post.tag.toLowerCase().includes(tag.toLowerCase());
            });

            setPosts(filteredPosts);
        } else {
            // Поиск по имени пользователя или тексту
            setSelectedTag(null);

            const filteredPosts = originalPosts.filter((post) => {
                return (
                    post.creator.username.toLowerCase().includes(text.toLowerCase()) ||
                    post.prompt.toLowerCase().includes(text.toLowerCase())
                );
            });

            setPosts(filteredPosts);
        }
    }

    const handleTagClick = (tag) => {
        if (selectedTag === tag) {
            // Если тег уже выбран, сбрасываем его
            setSelectedTag(null);

            // Возвращаемся к исходному списку постов
            setSearchText("");
            setPosts(originalPosts);
        } else {
            setSelectedTag(tag);

            const filteredPosts = originalPosts.filter((post) => {
                return post.tag.toLowerCase() === tag.toLowerCase();
            });

            setPosts(filteredPosts);

            // Вводим тег в поле поиска с символом '#'
            setSearchText(`#${tag}`);
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const data = await response.json();
            setPosts(data);
            setOriginalPosts(data);
        }

        fetchPosts();
    }, []);

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input 
                    type='text'
                    placeholder='Search for a tag or username...'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
                
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={handleTagClick}
            />
        </section>
    );
}
