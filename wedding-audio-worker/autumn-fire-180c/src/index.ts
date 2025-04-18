export default {
	async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const key = url.pathname.slice(1) || 'ourStory.mp3';

		console.log('🔍 요청된 키:', key);

		const object = await env.AUDIO_BUCKET.get(key);
		if (!object || !object.body) {
			console.log('❌ 파일 없음');
			return new Response('File not found', { status: 404 });
		}

		console.log('✅ 파일 찾음, 응답 반환');
		return new Response(object.body, {
			headers: {
				'Content-Type': 'audio/mpeg',
				'Content-Length': object.size?.toString() ?? '',
				'Cache-Control': 'public, max-age=31536000, immutable',
				'Accept-Ranges': 'bytes',
			},
		});
	},
};
