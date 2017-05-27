#pragma once

#include <QWeakPointer>
#include <QSharedPointer>

#include <odb/qt/lazy-ptr.hxx>

template<class T>
using Pointer = QSharedPointer<T>;

template<class T>
using WeakPointer = QWeakPointer<T>;

template<class T>
using LazyPointer = QLazySharedPointer<T>;

template<class T>
using LazyWeakPointer = QLazyWeakPointer<T>;
