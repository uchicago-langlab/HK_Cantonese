// This is a simple demo script, feel free to edit or delete it
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null); // Shorten command names (keep this line here)


PreloadZip('https://www.langlab123.com/expt_materials/hk_materials_img.zip');
PreloadZip('https://www.langlab123.com/expt_materials/can_materials_audio.zip');
// PreloadZip('https://www.langlab123.com/expt_materials/can_materials.zip');
// PreloadZip('https://weixu16.dreamhosters.com/expt_materials/can_materials.zip');

DebugOff();

Sequence("intro", "instruction", "instruction_sum1", "initiate", "p_trials_0", "instruction_sum2", "p_trials", subsequence( randomize("d_trials") , randomize("rf_trials") ), 'subj_info', "exit");

var completionMessage = "數據傳送完畢。 非常感謝您的參與！"
var defaults = [
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true,
        continueMessage: "點擊此鍵繼續。"
    }
];

// Questionnaires and introduction
var items = [

["intro", "Form", {consentRequired: true, html: {include: "consent.html" }} ],
["intro", "Form", {consentRequired: true, html: {include: "intro1.html" }} ],
["subj_info", "Form", {consentRequired: true, html: {include: "intro.html" }} ],

];


// Presenting experiment instruction
newTrial("instruction",
    defaultText
        .print()
    ,
    newAudio("instruction_audio", "cantonese_instruction.wav")
        .play()
    ,
    newText("<strong>具體實驗過程：</strong>")
    ,
    newText("<p>本次實驗中，你將會依次序看到一系列圖片及詞語，並通過錄音的形式以<strong><u><i>廣東話</i></u></strong>用所給詞語描述圖片中的場景。</p>")
    ,
    newText("<p>每次錄音時，你需要點擊圖片下方的紅色圓形按鈕開始錄音，並在敘述完畢後再次點擊紅色圓形按鈕結束錄音。錄音結束後你可以點擊播放鍵回放剛才的錄音。</p>")
    ,
    newImage("recording_button.png")
        .print()
    ,
    newText("<p>錄音完成後，請按在錄音鍵下方的按鈕，進入下一張圖片。若未出現該按鈕，請注意檢查是否有再次點擊紅色按鈕結束錄音。</p>")
    ,
    newImage("next_button.png")
        .print()
    ,
    newText("<p>請注意！每張圖片您只有一次錄音機會。在結束錄音後再次點擊紅色按鈕，否則錄音將會失效。若您需要更改錄音内容，只需在<strong>再次點擊紅色按鈕，結束錄音前</strong>繼續重新敘述更正後的內容即可。</p>")
    ,
    newButton("continue", "點擊此鍵繼續")
        .print()
        .wait()
    ,
    getAudio("instruction_audio")
        .stop()
);

newTrial("instruction_sum1",
    defaultText
        .print()
    ,
    newAudio("instruction_sum1_audio", "cantonese_instruction_sum.wav")
        .play()
    ,
    newText("<strong>實驗過程重點總結：</strong>")
    ,
    newText("<p>1. 點擊紅色按鈕開始錄音。</p>")
    ,
    newText("<p>2. 錄音結束後再次點擊紅色按鈕結束錄音。</p>")
    ,
    newText("<p>3. 如果想再聽重播，可以點擊綠色按鈕，但不可以再次錄音。</p>")
    ,
    newText("<p>4. 錄音完成後，點擊矩形按鈕進入下一張圖片。</p>")
    ,
    newText("<p>5. 請以廣東話的一句話描述圖片，並用上圖片裡提供的動詞。</p>")
    ,
    newButton("continue", "點擊此鍵繼續")
        .print()
        .wait()
    ,
    getAudio("instruction_sum1_audio")
        .stop()
);


// Authorization page for VoiceRecorder
let replaceConsentMic = ()=>{
        let consentLink = $(".PennController-PennController a.Message-continue-link");
        if (consentLink.length > 0 && consentLink[0].innerHTML.match(/^By clicking this link I understand that I grant this experiment's script access to my recording device/))
            consentLink.html("請點擊此藍色鏈接，授權使用您的錄音設備");
        else
            window.requestAnimationFrame( replaceConsentMic );
};
window.requestAnimationFrame( replaceConsentMic );
// Indicate where to look for the PHP file you uploaded on you server
InitiateRecorder("https://www.langlab123.com/HK_cantonese/setup.php", "本次實驗將收集您的音頻樣本，您的瀏覽器可能會彈出窗口提示您使用授權錄音設備。通過授權錄音設備並繼續參與本次實驗，您將同時授權本次實驗的研究人員匿名收集您在本次實驗中的音頻樣本。收集到的音頻文件將被上傳並托管到研究人員指定的服務器上。如果您接受本次請求，在整個實驗過程中您將會在實驗窗口頂部看到一個錄音標籤，提示您系統是否正在收集您的錄音記錄。")
    .label("initiate");

// P trial exercise
newTrial("p_trials_0",
    newAudio("exercise_audio", "cantonese_exercise.wav")
        .play()
    ,
    newText("trial_instruction", "<strong>現在是聯繫環節，並幫助你熟悉實驗流程。</strong>")
        .print()
    ,
    newText("trial_instruction", "您的任務是以廣東話用<strong>一句话</strong>描述這張圖片。請用到圖片上提供的<strong>動詞</strong>:")
        .print()
    ,
    newImage("cantonese_01.png")
        .print()
    ,
    newVoiceRecorder("can_p01")
        .once()
        .print()
        .wait()
    ,
    newButton("continue", "點擊此鍵繼續")
        .print()
        .wait()
    ,
    getAudio("exercise_audio")
        .stop()
);

newTrial("instruction_sum2",
    defaultText
        .print()
    ,
    newAudio("instruction_sum2_audio", "cantonese_instruction_sum.wav")
        .play()
    ,
    newText("<strong>您掌握了嗎？</strong>")
    ,
    newText("<p>1. 點擊紅色按鈕開始錄音。>")
    ,
    newText("<p>2. 錄音結束後再次點擊紅色按鈕結束錄音。</p>")
    ,
    newText("<p>3. 如果想再聽重播，可以點擊綠色按鈕，但不可以再次錄音。</p>")
    ,
    newText("<p>4. 錄音完成後，點擊矩形按鈕進入下一張圖片。</p>")
    ,
    newText("<p>5. 請以廣東話的一句話描述圖片，並用上圖片裡提供的動詞。</p>")
    ,
    newText("<p>在掌握了以上實驗重點後，請點擊下方按鈕正式開始實驗。</p>")
    ,
    newButton("continue", "點擊此鍵開始實驗")
        .print()
        .wait()
    ,
    getAudio("instruction_sum2_audio")
        .stop()
);

// p trials
newTrial("p_trials",
    newText("trial_instruction", "請以廣東話用<strong>一句話</strong>描述圖片，用到圖片上提供的<strong>動詞</strong>。")
        .print()
    ,
    newImage("cantonese_02.png")
        .print()
    ,
    newVoiceRecorder("can_p02")
        .once()
        .print()
        .wait()
    ,
    newButton("continue", "點擊此鍵進入下一張圖片")
        .print()
        .wait()
);

newTrial("p_trials",
    newText("trial_instruction", "請以廣東話用<strong>一句話</strong>描述圖片，用到圖片上提供的<strong>動詞</strong>。")
        .print()
    ,
    newImage("cantonese_03.png")
        .print()
    ,
    newVoiceRecorder("can_p03")
        .once()
        .print()
        .wait()
    ,
    newButton("continue", "點擊此鍵進入下一張圖片")
        .print()
        .wait()
);

// D Trials
Template( "CantoneseDTrials.csv", variable => 
  newTrial("d_trials",
    newText("trial_instruction", "請以廣東話用<strong>一句話</strong>描述圖片，用到圖片上提供的<strong>動詞</strong>。")
        .print()
    ,
    newImage(variable.CantoneseImages)
        .print()
    ,
    newVoiceRecorder(variable.OutputAudios)
        .once()
        .print()
        .wait()
    ,
    newButton("continue", "點擊此鍵進入下一張圖片")
        .print()
        .wait()
    )
);


// RF Trials
Template( "CantoneseRFTrials.csv", variable => 
  newTrial("rf_trials",
    newText("trial_instruction", "請以廣東話用<strong>一句話</strong>描述圖片，用到圖片上提供的<strong>動詞</strong>。")
        .print()
    ,
    newImage(variable.CantoneseImages)
        .print()
    ,
    newVoiceRecorder(variable.OutputAudios)
        .once()
        .print()
        .wait()
    ,
    newButton("continue", "點擊此鍵進入下一張圖片")
        .print()
        .wait()
    )
);


// Completion screen for the experiement
var items = [
["exit", "Form", {consentRequired: false, html: {include: "exit.html" }} ],
];
