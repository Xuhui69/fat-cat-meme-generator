const API_URL = 'https://api.coze.cn/v3/chat';
const API_KEY = 'pat_vdAPGdieANFUphD8kKGFJSjdOgHH5FoDYrqTdfXF3TGICkxFvG0fUWNQcZgGUAQH';
const BOT_ID = '7463118394125369394';

// 检查是否是图片URL的函数
function isImageUrl(url) {
    // 修改为接受coze.cn的URL格式
    return typeof url === 'string' && (
        url.match(/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i) ||
        url.match(/^https?:\/\/s\.coze\.cn\/t\/[a-zA-Z0-9_-]+\/?$/i)
    );
}

// 获取表情图片的函数
async function fetchEmoji(keyword) {
    const responseDiv = document.getElementById('response');
    const imagePreview = document.getElementById('imagePreview');
    const loading = document.getElementById('loading');
    const downloadBtn = document.getElementById('downloadBtn');
    
    try {
        responseDiv.textContent = `正在生成"${keyword}"的表情...`;
        responseDiv.style.display = 'block';
        loading.style.display = 'block';
        imagePreview.style.display = 'none';
        downloadBtn.style.display = 'none';

        const requestBody = {
            bot_id: BOT_ID,
            user_id: '123456789',
            stream: true,
            auto_save_history: true,
            additional_messages: [
                {
                    role: 'user',
                    content: `生成一个${keyword}的表情包`,
                    content_type: 'text'
                }
            ]
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let foundImage = false;

        while (true) {
            const {value, done} = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, {stream: true});
            const events = buffer.split('\n\n');
            buffer = events.pop() || '';

            for (const event of events) {
                if (!event.trim()) continue;

                try {
                    const eventLines = event.split('\n');
                    const dataLine = eventLines.find(line => line.startsWith('data:'));
                    if (!dataLine) continue;

                    const dataJson = dataLine.replace('data:', '');
                    const data = JSON.parse(dataJson);
                    
                    if (data.content) {
                        console.log('收到内容:', data.content);
                        
                        // 检查是否直接是coze.cn的URL
                        if (isImageUrl(data.content)) {
                            console.log('找到图片URL:', data.content);
                            foundImage = true;
                            imagePreview.src = data.content;
                            imagePreview.style.display = 'block';
                            responseDiv.style.display = 'none';
                            downloadBtn.style.display = 'inline-block';
                            break;
                        }
                    }
                } catch (e) {
                    console.error('解析事件数据出错:', e);
                }
            }

            if (foundImage) break;
        }

        if (!foundImage) {
            responseDiv.textContent = '未能生成表情图片，请重试';
            imagePreview.style.display = 'none';
            downloadBtn.style.display = 'none';
        }
    } catch (error) {
        console.error('获取表情图片失败:', error);
        responseDiv.textContent = '获取表情图片失败，请重试。错误：' + error.message;
        responseDiv.style.display = 'block';
        imagePreview.style.display = 'none';
        downloadBtn.style.display = 'none';
    } finally {
        loading.style.display = 'none';
    }
}

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) {
        alert('请输入表情描述！');
        return;
    }

    await fetchEmoji(message);
}
