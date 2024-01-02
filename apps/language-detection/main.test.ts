import { DetectLanguageSuccessResult, TextAnalyticsClient } from "@azure/ai-text-analytics";
import { DefaultAzureCredential } from "@azure/identity";

describe('Lamguage detection', () =>
{
    const endpoint = "https://rink72aistudy-cog.cognitiveservices.azure.com";

    let textAnalyticsClient: TextAnalyticsClient;

    beforeEach(() =>
    {
        textAnalyticsClient = new TextAnalyticsClient(endpoint, new DefaultAzureCredential());
    });

    it('should detect english', async () =>
    {
        const input = 'I am an english sentence.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('English');
    });

    it('should detect french', async () =>
    {
        const input = 'Je suis une phrase française.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('French');
    });

    it('should detect spanish', async () =>
    {
        const input = 'Soy una oración en español.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('Spanish');
    });

    it('should detect german', async () =>
    {
        const input = 'Ich bin ein deutscher Satz.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('German');
    });

    it('should detect italian', async () =>
    {
        const input = 'Sono una frase italiana.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('Italian');
    });

    it('should detect Maori', async () =>
    {
        const input = 'Ko ahau te hē.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('Maori');
    });

    it('should detect Chinese', async () =>
    {
        const input = '我是中文句子。';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('Chinese_Simplified');
    });

    it('should detect Japanese', async () =>
    {
        const input = '私は日本語の文章です。';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('Japanese');
    });

    it('should detect Korean', async () =>
    {
        const input = '나는 한국어 문장입니다.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('Korean');
    });

    it('should detect Arabic', async () =>
    {
        const input = 'أنا جملة عربية.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('Arabic');
    });

    it('should detect Hindi', async () =>
    {
        const input = 'मैं हिंदी वाक्य हूं।';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('Hindi');
    });

    it('should detect Russian', async () =>
    {
        const input = 'Я русское предложение.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('Russian');
    });

    it('should detect Portuguese', async () =>
    {
        const input = 'Eu sou uma frase em português.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('Portuguese');
    });

    it('should detect Turkish', async () =>
    {
        const input = 'Ben türkçe bir cümleyim.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('Turkish');
    });

    it('should detect Vietnamese', async () =>
    {
        const input = 'Tôi là một câu tiếng Việt.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('Vietnamese');
    });

    it('should detect Polish', async () =>
    {
        const input = 'Jestem polskim zdaniem.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toBe('Polish');
    });

    it('should detect Dutch', async () =>
    {
        const input = 'Ik ben een Nederlandse zin.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toEqual('Dutch');
    });

    it('should detect Swedish', async () =>
    {
        const input = 'Jag är en svensk mening.';

        const result = (await textAnalyticsClient.detectLanguage([input], ""))[0];

        expect(result.error).toBeUndefined();
        expect((result as DetectLanguageSuccessResult).primaryLanguage.name).toEqual('Swedish');
    });
});
