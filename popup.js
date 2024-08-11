
        document.addEventListener('DOMContentLoaded', function() {
            const checkSpeedButton = document.getElementById('check-speed');
            const downloadSpeedElement = document.getElementById('download-speed');
            const uploadSpeedElement = document.getElementById('upload-speed');
            const pingElement = document.getElementById('ping');
            const packetLossElement = document.getElementById('packet-loss');

            checkSpeedButton.addEventListener('click', function() {
                downloadSpeedElement.textContent = 'Loading...';
                uploadSpeedElement.textContent = 'Loading...';
                pingElement.textContent = 'Loading...';
                packetLossElement.textContent = 'Loading...';

                fetch('http://localhost:3000/speed')
                    .then(response => response.json())
                    .then(data => {
                        const speedData = data.data;
                        const downloadSpeedMbps = (speedData.download.bandwidth / 125000).toFixed(2); // Convert from bits/s to Mbps
                        const uploadSpeedMbps = (speedData.upload.bandwidth / 125000).toFixed(2); // Convert from bits/s to Mbps

                        downloadSpeedElement.textContent = downloadSpeedMbps;
                        uploadSpeedElement.textContent = uploadSpeedMbps;
                        pingElement.textContent = speedData.ping.latency.toFixed(2);
                        packetLossElement.textContent = speedData.packetLoss.toFixed(2);
                    })
                    .catch(error => {
                        console.error('Error fetching speed data:', error);
                        downloadSpeedElement.textContent = 'Error';
                        uploadSpeedElement.textContent = 'Error';
                        pingElement.textContent = 'Error';
                        packetLossElement.textContent = 'Error';
                    });
            });
        });