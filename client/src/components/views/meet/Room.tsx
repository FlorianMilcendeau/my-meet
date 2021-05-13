/* eslint-disable jsx-a11y/media-has-caption */
import React, { ReactElement, useState } from 'react';

const Room = (): ReactElement => {
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [isShow, setIsShow] = useState<boolean>(true);

    const getConnectedDevices = async (type: string) => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter((device) => device.kind === type);
    };

    // Open camera with at least minWidth and minHeight capabilities
    async function openCamera(
        cameraId: string,
        width: { min: number; max: number },
        height: { min: number; max: number },
    ) {
        const constraints = {
            audio: { echoCancellation: true },
            video: {
                deviceId: cameraId,
                width: { min: width.min, max: width.max },
                height: { min: height.min, max: height.max },
            },
        };

        return navigator.mediaDevices.getUserMedia(constraints);
    }

    // eslint-disable-next-line no-void
    void (async () => {
        const cameras = await getConnectedDevices('videoinput');
        if (cameras && cameras.length > 0) {
            const stream = await openCamera(
                cameras[0].deviceId,
                {
                    min: 640,
                    max: 1024,
                },
                {
                    min: 480,
                    max: 768,
                },
            );

            const mediaStreamTrack: MediaStreamTrack[] = stream.getTracks();

            mediaStreamTrack[0].enabled = isMuted;
            mediaStreamTrack[1].enabled = isShow;
            const video = document.getElementById(
                'localVideo',
            ) as HTMLVideoElement;

            video.srcObject = stream;
        }
    })();

    return (
        <div>
            <h1>My meet</h1>
            <video id="localVideo" autoPlay playsInline />
            <button type="button" onClick={() => setIsMuted(!isMuted)}>
                mute
            </button>
            <button type="button" onClick={() => setIsShow(!isShow)}>
                video
            </button>
        </div>
    );
};

export default Room;
