import Bannerbear from 'bannerbear';
import { PropUpdate } from './types';
import { formatTimestampString } from './funcs';


export async function createImage(update: PropUpdate, ensAvatar: string, ensName: string): Promise<string>{
   const bb = new Bannerbear("bb_pr_16ebb0cb154c424e36a610f175755e");
   const image = await bb.create_image("1eGqK9b3PKwnZnaYpP",{ modifications: [
         {
            name: "background",
            color: null
         },
         {
            name: "cardbackground",
            color: null
         },
         {
            name: "update background",
            color: null
         },
         {
            name: "update",
            text: update.update.substring(0, 500),
            color: null,
            background: null
         },
         {
            name: "face",
            image_url: ensAvatar
         },
         {
            name: "username",
            text: ensName,
            color: null,
            background: null
         },
         {
            name: "proptitle",
            text: update.prop.title,
            color: null,
            background: null
         },
         {
            name: "date",
            text: formatTimestampString(update.blockTimestamp),
            color: null,
            background: null
         },
         {
            name: "propID",
            text: `#${update.prop.id}`,
            color: null,
            background: null
         }
      ],
   },
   true);

   return image.image_url_png
}