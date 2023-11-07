import { toast } from "react-toastify";

// ### IMAGE SHARE ON SOCIAL MEDIA
export const shareOnFacebook = (imageUrl) => {
    const urlToShare = encodeURIComponent(imageUrl);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`;
    window.open(
      facebookShareUrl,
      "_blank",
      "toolbar=0,status=0,width=626,height=436"
    );
  };

  export const shareOnTwitter = (imageUrl) => {
    const urlToShare = encodeURIComponent(imageUrl);
    const text = encodeURIComponent("FotoIdol Image");
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${urlToShare}&text=${text}`;
    window.open(
      twitterShareUrl,
      "_blank",
      "toolbar=0,status=0,width=626,height=436"
    );
  };

  export const shareOnLinkedIn = (imageUrl) => {
    const urlToShare = encodeURIComponent(imageUrl);
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${urlToShare}`;
    window.open(
      linkedInShareUrl, 
      "_blank",
      "toolbar=0,status=0,width=626,height=436"
    );
  };

  export const shareOnPinterest = (imageUrl, descrip) => {
    if (imageUrl) {
      const description = descrip;
      const shareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
        imageUrl
      )}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(
        description
      )}`;
      window.open(shareUrl, "_blank", "width=600,height=300");
    }
  };

  // only on mobile
  export const shareOnInstagram = (imageUrl) => {
    const urlToShare = encodeURIComponent(imageUrl);
    const instagramShareUrl = `https://www.instagram.com/share?url=${urlToShare}`;
    window.open(
      instagramShareUrl,
      "_blank",
      "toolbar=0,status=0,width=626,height=436"
    );
  };

  // COPY TO CLIPBOARD
  export const copyImageURL = (imageUrl) => {
    if (imageUrl) {
      const textArea = document.createElement("textarea");
      textArea.value = imageUrl;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.select();

      try {
        // @ts-ignore
        document.execCommand("copy");
        toast.success("Image URL copied to clipboard");
      } catch (err) {
        toast.error("Unable to copy: ", err);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };