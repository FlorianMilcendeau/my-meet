import React, { ReactElement } from 'react';

const Room = (): ReactElement => {
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
                width: window.innerWidth,
                height: window.innerHeight,
            },
        };

        return await navigator.mediaDevices.getUserMedia(constraints);
    }

    (async () => {
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
        </div>
    );
};

export default Room;
