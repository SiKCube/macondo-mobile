// JavaScript / React Native
// import React from 'react';
// import { ScrollView, View, Text, Dimensions, Image } from 'react-native';
// import Markdown, { RenderRules } from 'react-native-markdown-display';
// import Video from 'react-native-video';

// // Sample markdown containing video
// const markdownContent = `I wasn't sure how to make the website design, I was trying different ideas modifying the code.\n![image](https://cdn.hackclub.com/01a01cf8-ae00-7466-99a6-b1e8fc6888e9/image.png)\nThis was the playing with the code. Then i got the idea to use Figma to get better idea.\n![image](https://cdn.hackclub.com/01a01cf4-265c-7dda-9206-76467e9b070f/landing-page.jpg)\nThis is the final result.\n![video](https://user-cdn.hackclub-assets.com/01a02245-fa26-7954-a791-8aa50c54597f/Screen%20Recording%202026-08-20%20230153.mp4)`;

// const VideoMarkdown = () => {
//   const renderers: RenderRules = {
//     image: ({ attributes, index }) => {
//       console.log(attributes)
//       // Treat URLs ending with .mp4, .mov, etc. as videos
//       if (attributes.alt === "video") {
//         return (
//           <Video
//             key={index}
//             source={{ uri: attributes.src }}
//             style={{ width: '100%', aspectRatio: 16 / 9 }}
//             controls
//             resizeMode="none"
//           />
//         );
//       }
//       return <Image key={index} source={{ uri: attributes.src }} style={{ width: 200, height: 200 }} />;
//     },
//   };

//   return (
//     <ScrollView style={{ flex: 1, padding: 20 }}>
//       <Markdown
//         style={{
//           body: { fontSize: 16 },
//           heading1: { fontSize: 24, fontWeight: 'bold' },
//         }}
        
//         rules={renderers}
//       >
//         {markdownContent}
//       </Markdown>
//     </ScrollView>
//   );
// };

// export default VideoMarkdown;