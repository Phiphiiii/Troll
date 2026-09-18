let positionX = 50;
const positionY = 50;
let popupNumber = 0;
const popupWindows = [];
const popupIntervals = [];

function ouvertpopup() {
    let intervalId;

    function action() {
        const testWindow = window.open(
            '',
            `css-help-test-window-${popupNumber}`,
            `width=300,height=300,left=${positionX},top=${positionY}`
        );
        popupNumber += 1;

        if (!testWindow) {
            clearInterval(intervalId);
            alert('Les fenêtres ont été bloquées. Autorise les fenêtres popup pour ce fichier.');
            return;
        }

        testWindow.document.write(`
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <title>Fenêtre secondaire</title>
            </head>
            <body style="background-color:lightblue;">
            </body>
            </html>
        `);
        testWindow.document.close();
        popupWindows.push(testWindow);

        positionX += 50;
        if (positionX >= 1200) {
            clearInterval(intervalId);
        }
    }

    intervalId = setInterval(action, 50);
    popupIntervals.push(intervalId);
    action();
}

function fermerToutesLesFenetres() {
    popupIntervals.forEach((intervalId) => clearInterval(intervalId));
    popupWindows.forEach((popupWindow) => {
        if (!popupWindow.closed) {
            popupWindow.close();
        }
    });
    popupIntervals.length = 0;
    popupWindows.length = 0;
}

