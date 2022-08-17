module.exports = app => {
  console.log('app:', app);
  return {
    schedule: {
      interval: '1m',
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: true,
    },
    async task(ctx) {
      // console.log('定时任务执行了123', ctx);
    },
  };
};
