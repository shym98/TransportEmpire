#pragma once

#include "Role.h"
#include "Database/Entity.h"

#include <QtCore/QDebug>
#include <QtCore/QString>
#include <QtCore/QJsonArray>
#include <QtCore/QJsonObject>


class User;
class Credentials : public db::Entity
{
    PERSISTENT
private:
    Role role;
    QString login;
    QString password;

public:
    Credentials() = default;
    Credentials(Role _role, QString _login, QString _password);
    Credentials(QJsonObject credentials);

public:
    QString getLogin()      const { return login;   }
    Role getRole()          const { return role;    }

    void setRole(Role _role) { role = _role; }

    bool hasPasswordOf(const Credentials& credentials) const {
        return password == credentials.password;
    }

public:
    QJsonObject toJsonObject() const;

public:
    void Debug() const
    {
        qDebug().nospace()
                << "Credentials (login: "   << login
                << ", password: "           << password
                << ", role: "               << (int) role
                << ")";
    }
};

#include "Credentials-map.h"

