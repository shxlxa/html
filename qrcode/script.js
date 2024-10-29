document.addEventListener('DOMContentLoaded', function() {
    let qrcode = null;
    
    window.generateQRCode = function() {
        const text = document.getElementById('text-input').value;
        if (!text) {
            alert('请输入内容');
            return;
        }
        
        // 清除之前的二维码
        const qrcodeDiv = document.getElementById('qrcode');
        qrcodeDiv.innerHTML = '';
        
        // 创建新的二维码
        try {
            qrcode = new QRCode(qrcodeDiv, {
                text: text,
                width: 256,
                height: 256,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            
            // 显示下载按钮
            document.querySelector('.download-btn').style.display = 'block';
        } catch (error) {
            console.error('生成二维码时出错:', error);
            alert('生成二维码时出错，请稍后重试');
        }
    };
    
    window.downloadQRCode = function() {
        const img = document.querySelector('#qrcode img');
        if (img) {
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = img.src;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
}); 