"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import React, { useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	var userId = "";
	var Stories = [];
	//app value
	const [value, setValue] = useState("");
	var [userData, setUserData] = useState("");
	var [userStories, setUserStories] = useState("");
	// user data
	var [userName, setUserName] = useState("");
	var [fullName, setFullName] = useState("");
	var [biography, setBiography] = useState("");
	var [follwersCounter, setFollwersCounter] = useState("");
	var [followingCount, setFollowingCount] = useState("");
	var [profilePicture, setProfilePicture] = useState("");
	var [numberofPost, setNumberofPost] = useState("");

	const getTextValue = async () => {
		try {
			const res = await axios.get("http://localhost:3000//ig/info_username/", {
				headers: {
					"X-RapidAPI-Key":
						"a96c349b9emsh5273ef219bf6bb3p1dd464jsn982765159a21",
					"X-RapidAPI-Host": "instagram-scraper-2022.p.rapidapi.com",
				},
				params: { user: value },
			});
			userId = res?.data?.user?.pk_id;
			userName = setUserName(res?.data?.user?.username);
			fullName = setFullName(res?.data?.user?.full_name);
			biography = setBiography(res?.data?.user?.biography);
			follwersCounter = setFollwersCounter(res?.data?.user?.follower_count);
			followingCount = setFollowingCount(res?.data?.user?.following_count);
			profilePicture = setProfilePicture(
				res?.data?.user?.hd_profile_pic_url_info?.url
			);
			numberofPost = setNumberofPost(res?.data?.user?.media_count);
			userData = setUserData(getUserStoriesObj(userId));
		} catch (err) {
			console.log(err);
		}
	};

	const getUserStoriesObj = async (userId) => {
		try {
			const res = await axios.get("http://localhost:3000//ig/stories/", {});
			const temp = res.data.reels[userId]?.items;
			// userStories = setUserStories(getUserStories(temp));
			console.log(getUserStories(temp));
			console.log(temp, "temp");

			return res;
		} catch (err) {
			console.log(err);
		}
	};

	const getUserStories = (obj) => {
		for (const i in obj) {
			console.log(obj.hasOwnProperty("video_versions") !== undefined);
			if (obj.hasOwnProperty("video_versions") !== undefined) {
				Stories.push(obj?.video_versions["0"].url); //todo
			} else {
				Stories.push(obj?.image_versions2?.candidates["0"]?.url); //todo
			}
		}
		return Stories;
	};

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<h3 className={inter.className}>
					<Image
						src="/Instagram reelsanonymous.svg"
						alt="Vercel Logo"
						className={styles.vercelLogo}
						width={24}
						height={24}
						priority
					/>
					InstaAnony
				</h3>
			</div>
			<div className={styles.center}>
				<h1 className={inter.className}>
					Stay incognito and watch Instagram Reels like a ninja with these
					simple steps.
				</h1>
			</div>

			<div className={styles.center}>
				<div className={styles.grid}>
					<a
						className={(styles.card, styles.gradient)}
						target="_blank"
						rel="noopener noreferrer"
					>
						<h2 className={inter.className}>
							Enter Username <span>-&gt;</span>
						</h2>
						<p className={inter.className}>
							Enter Instagram Username in Searchbar
						</p>
					</a>

					<a
						className={(styles.card, styles.gradient)}
						target="_blank"
						rel="noopener noreferrer"
					>
						<h2 className={inter.className}>
							Hit Submit <span>-&gt;</span>
						</h2>
						<p className={inter.className}>
							We will Search for Instagram Account
						</p>
					</a>

					<a
						className={(styles.card, styles.gradient)}
						target="_blank"
						rel="noopener noreferrer"
					>
						<h2 className={inter.className}>
							Enjoy!! <span>-&gt;</span>
						</h2>
						<p className={inter.className}>All the stories and be anonymouse</p>
					</a>
				</div>
			</div>

			<div className={styles.flexDirectionCol}>
				<div>
					<h1 className={inter.className}>Add Instagram Username</h1>
				</div>
				<div className={styles.container}>
					<div className={styles.searchbox}>
						<input
							type="text"
							id="searchinput"
							className={styles.searchinput}
							placeholder="Search.."
							value={value}
							onChange={handleChange}
						></input>

						<button
							type="submit"
							className={styles.searchbutton}
							onClick={getTextValue}
						>
							<Image
								src="/search.svg"
								alt="Vercel Logo"
								className={styles.vercelLogo}
								width={24}
								height={24}
								priority
							/>
						</button>
					</div>
				</div>
			</div>

			<div className={styles.center}>
				<h3 className={inter.className}>{userName}</h3>
				<div className={styles.grid}>
					<img src={profilePicture} width="200" height="200"></img>
					<div>
						<a className={inter.className}>
							Fullname:
							<p>{fullName}</p>
						</a>
						<a className={inter.className}>
							Biography:
							<p>{biography}</p>
						</a>
						<a className={inter.className}>
							Followers:
							<p>{follwersCounter}</p>
						</a>
						<a className={inter.className}>
							Following:
							<p>{followingCount}</p>
						</a>
						<a className={inter.className}>
							Posts:
							<p>{numberofPost}</p>
						</a>
					</div>
				</div>
			</div>
		</main>
	);
}
