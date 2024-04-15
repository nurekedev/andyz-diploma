from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

class CommentThrottling(UserRateThrottle):
    scope = 'comment'