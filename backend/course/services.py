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
        only=('title', 'slug', 'short_description', 'long_description', 'created_by', 'image')
    )
    return course_queryset.filter(**kwargs)[::4]


def active_courses(objects, **kwargs):
    course_queryset = all_objects(
        objects=objects,
        only=('title', 'slug', 'short_description', 'long_description', 'created_by', 'image')
    )
    return course_queryset.filter(**kwargs)


def get_detailed_course(objects, **kwargs):
    course_lessons_queryset = all_objects(
        objects=objects,
        only=('title', 'slug', 'short_description', 'long_description', 'created_by', 'image')
    )

    return course_lessons_queryset.filter(**kwargs).first()
