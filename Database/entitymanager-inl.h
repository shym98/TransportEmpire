#include "entitymanager.h"

namespace db {

template<class T>
using EntityPointer = typename EntityManager::EntityPointer<T>;

template<class T>
EntityPointer<T> EntityManager::load(unsigned int id)
{
    return transactive([&] () {
        return db->load<T>(id);
    });
}

template<class T>
QVector<EntityPointer<T>> EntityManager::load(const query<T>& _query)
{
    return transactive([] () {
        result<T> queryResult{ db->query<T>(_query) };
        return QVector<EntityPointer<T>>{ queryResult.begin(), queryResult.end() };
    });
}

template<class T>
void EntityManager::erase(const query<T>& _query)
{
    transactive([&] () {
        db->erase_query<T>(_query);
    });
}

template<typename Action>
auto EntityManager::transactive(Action action)
{
    if(transaction::has_current()) {
        return action();
    } else {
        transaction(db->begin());
        return action();
        transaction::current().commit();
    }
}

} // namespace db
