from .models import *


def only_objects_decorator(func: callable):
    def only_objects_wrapper(objects, only=(), *args, **kwargs):
        result = func(objects, *args, **kwargs)
        if result is not None:
            return result.only(*only) if only else result
        else:
            return None

    return only_objects_wrapper


@only_objects_decorator
def all_objects(objects):
    return objects.all()


@only_objects_decorator
def courses_by_category(objects, category, **kwargs):
    return objects.filter(categories__id=category, **kwargs)


def courses_newest(objects, **kwargs):
    course_queryset = all_objects(
        objects=objects,
        only=('title',)
    )
    return course_queryset.filter(**kwargs)


