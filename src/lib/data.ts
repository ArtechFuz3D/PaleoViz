import { colors } from "./colors";

export interface Playlist {
  id: string;
  title: string;
  color: (typeof colors)[keyof typeof colors];
  cover: string;
  artists: string[];
  songs: Song[];
}

export const playlists: Playlist[] = [
  {
    id: "1",
    title: "Rock Party",
    color: colors.teal,
    cover:
      "https://res.cloudinary.com/ddmxjiyox/image/upload/v1704625523/photo-1703994643629-6d0d56ee7a0f_iwdcrn.jpg",
    artists: ["Audioslave", "Incubus"],
    songs: [],

  },
  {
    id: "2",
    title: "Dance Party",
    color: colors.green,
    cover:
      "https://res.cloudinary.com/ddmxjiyox/image/upload/v1694054795/samples/outdoor-woman.jpg",
    artists: ["Tiesto", "Armin Van Buuren"],
    songs: [],
  },
  {
    id: "3",
    title: "Foot Vibes",
    color: colors.rose,
    cover:
      "https://res.cloudinary.com/ddmxjiyox/image/upload/v1694054769/samples/ecommerce/shoes.png",
    artists: ["Metallica", "Travis Scott", "21 savage"],
    songs: [],
  },
  {
    id: "4",
    title: "Beatles Classics",
    color: colors.red,
    cover:
      "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/playlist_4_ap5xnb.jpg",
    artists: ["The Beatles"],
    songs: [],
  },
  {
    id: "5",
    title: "Electronic Dance",
    color: colors.pink,
    cover:
      "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/playlist_5_erjyb7.jpg",
    artists: ["Deadmau5"],
    songs: [],
  },
  {
    id: "6",
    title: "Cow songs",
    color: colors.gray,
    cover:
      "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776474/spotify-astro/R-15112137-1586815179-1911_fsyl58.jpg",
    artists: ["Saint Hilda", "Canada Buffalo"],
    songs: [],
  },
];

export const morePlaylists = [
  ...playlists.map((item) => ({
    ...item,
    id: item.id + "a",
  })),
];

export const sidebarPlaylists = [
  ...playlists.map((item) => ({
    ...item,
    id: item.id + "_side",
  })),
];

export const allPlaylists = [
  ...playlists,
  ...morePlaylists,
  ...sidebarPlaylists,
];

interface Song {
  id: string;
  title: string;
  image: string;
  artists: string[];
  album: string;
  duration: string;
  url: string;
  
}
const songScale = "w_40,h_40,c_scale";
export const songs: Song[] = [
  {
    id: "1",
    title: "Gasoline",
    image: `https://res.cloudinary.com/ddmxjiyox/image/upload/v1704625523/photo-1703994643629-6d0d56ee7a0f_iwdcrn.jpg`,
    artists: ["AudioSlave"],
    album: "Cochise",
    duration: "--:--",
    url: "/tracks/gasoline.mp3"
  },
  {
    id: "2",
    title: "Pneuma (Danny Carey Drum Live)",
    image: `https://res.cloudinary.com/ddmxjiyox/image/upload/${songScale}/v1694054769/samples/ecommerce/shoes.png`,
    artists: ["Tool"],
    album: "10000 days",
    duration: "--:--",
    url: "tracks/pneuma.mp3"
  },
  {
    id: "3",
    title: "Knights of Cydonia",
    image: `https://res.cloudinary.com/ddmxjiyox/image/upload/${songScale}/v1694054795/samples/outdoor-woman.jpg`,
    artists: ["Muse"],
    album: "",
    duration: "--:--",
    url: "tracks/cydonia.mp3"
  },
  {
    id: "4",
    title: "The Pot",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_4_lwumgu.png`,
    artists: ["Tool"],
    album: "10 000 Days",
    duration: "--:--",
    url: "tracks/ThePoot2.mp3"
  },
  {
    id: "5",
    title: "Good Lovin",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776175/spotify-astro/song_5_rd5xqa.jpg`,
    artists: ["Black Keys"],
    album: "÷ (Divide)",
    duration: "--:--",
    url: "tracks/blckkeysgoodlovin2.mp3"
  },
  {
    id: "6",
    title: "Baby don't forget my number",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776175/spotify-astro/song_6_f1lt7y.jpg`,
    artists: ["Milli Vanilli"],
    album: "Uptown Special",
    duration: "--:--",
    url: "tracks/milli.mp3"
  },
  {
    id: "7",
    title: "We Got The Funk",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776175/spotify-astro/song_7_m7f0mh.jpg`,
    artists: ["Funkadelic"],
    album: "We Got The Funk",
    duration: "--:--",
    url: "tracks/wegotfunk.mp3"
  },
  {
    id: "8",
    title: "I Might Be Wrong 2",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776175/spotify-astro/song_8_hwxisr.jpg`,
    artists: ["Radiohead"],
    album: "Today & Tomorrow",
    duration: "--:--",
    url: "tracks/mightbewrong.mp3"
  },
  {
    id: "9",
    title: "World Hold On",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_9_szemzp.jpg`,
    artists: ["Bob Sinclair"],
    album: "Bob Sinclair",
    duration: "--:--",
    url: "tracks/worldholdon.mp3"
  },
  {
    id: "10",
    title: "Soleil De Volt",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Baloji"],
    album: "Night Visions",
    duration: "--:--",
    url: "tracks/soleildevolt.mp3"
  },
  {
    id: "11",
    title: "Maggies Farm",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Rage Against The Machine"],
    album: "Rage Against The Machine",
    duration: "--:--",
    url: "tracks/maggiesfarm.mp3"
  },
  // {
  //   id: "12",
  //   title: "Give A Little Bit",
  //   image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
  //   artists: [""],
  //   album: "",
  //   duration: "--:--",
  //   url: "tracks/littlebit40.mp3"
  // },
  {
    id: "13",
    title: "Angeline",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Jamiroquai"],
    album: "",
    duration: "--:--",
    url: "tracks/angeline.mp3"
  },
  {
    id: "14",
    title: "Lost",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Roscoe"],
    album: "",
    duration: "--:--",
    url: "tracks/lost.mp3"
  },
  {
    id: "15",
    title: "Last Night",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Kinks"],
    album: "Kinks",
    duration: "--:--",
    url: "tracks/lastnight.mp3"
  },
  {
    id: "16",
    title: "O fOrtuna",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["O fOrtuna"],
    album: "O fOrtuna",
    duration: "--:--",
    url: "tracks/ofortuna.mp3"
  },
  {
    id: "17",
    title: "Doin Time",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Lana Del Rey"],
    album: "Lana Del Rey",
    duration: "--:--",
    url: "tracks/dointime17.mp3"
  },
  {
    id: "18",
    title: "L'americano",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["LAmericano"],
    album: "",
    duration: "--:--",
    url: "tracks/lamericano.mp3"
  },
  {
    id: "19",
    title: "Chase The Devil",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Max Romeo"],
    album: "chase",
    duration: "--:--",
    url: "tracks/chasedev.mp3"
  },
  {
    id: "20",
    title: "Rhinestone Eyes",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Gorillaz"],
    album: "Plastic Beach",
    duration: "--:--",
    url: "tracks/rhinestone.mp3"
  },
  {
    id: "21",
    title: "Aeroplane",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Red Hot Chilli Peppers"],
    album: "One Hot Minute",
    duration: "--:--",
    url: "tracks/aeroplane.mp3"
  },
  {
    id: "22",
    title: "Love RollerCoaster",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Red Hot Chilli Peppers"],
    album: "Beavis & Butthead",
    duration: "--:--",
    url: "tracks/loverc.mp3"
  },
  {
    id: "23",
    title: "Nevermind",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Red Hot Chilli Peppers"],
    album: "Freaky Styley",
    duration: "--:--",
    url: "tracks/nevermind1.22.mp3"
  },
  {
    id: "24",
    title: "Jump Around",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["House Of Pain"],
    album: "Single",
    duration: "--:--",
    url: "tracks/cametogetdownbutgotstretched.mp3"
  },
  {
    id: "25",
    title: "Full Belief 35",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Michael McDoobie"],
    album: "Doobie Mcdonald",
    duration: "--:--",
    url: "/tracks/FullBelief35.mp3"
  },
  {
    id: "26",
    title: "Again",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Incubus"],
    album: "Just A Phase",
    duration: "--:--",
    url: "tracks/ecsfatic.mp3"
  },
  {
    id: "27",
    title: "Dumpweed",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Blink 182"],
    album: "",
    duration: "--:--",
    url: "tracks/dumpweed30.mp3"
  },
  {
    id: "28",
    title: "So Forgetful",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Doobie McBroBro"],
    album: "",
    duration: "--:--",
    url: "tracks/keepforgetting31.mp3"
  },
  {
    id: "29",
    title: "Vito La Linga",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["I Charm"],
    album: "",
    duration: "--:--",
    url: "tracks/ICharm-LaLinga.mp3"
  },
  {
    id: "30",
    title: "Gazzara",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Rio funk"],
    album: "",
    duration: "--:--",
    url: "tracks/gazzara24.mp3"
  },
  {
    id: "31",
    title: "Everyones A Winner",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Hot Chocolate"],
    album: "",
    duration: "--:--",
    url: "tracks/every1sawinner3.mp3"
  },
  {
    id: "32",
    title: "You don't bring me flowers",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Stevie T feat. Jim Carrey"],
    album: "",
    duration: "--:--",
    url: "tracks/youdontbringmeflowers.mp3"
  },
  {
    id: "33",
    title: "Without Lando",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Hewfunkingknewit X Eminem X F1"],
    album: "",
    duration: "--:--",
    url: "tracks/withoutLandogettingThere.mp3"
  },
  {
    id: "34",
    title: "Negentropical Galaxy Theme Song",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Hewfunkingknewit"],
    album: "",
    duration: "--:--",
    url: "tracks/introsong.mp3"
  },
];